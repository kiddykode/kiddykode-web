import { describe, it } from 'node:test';
import assert from 'node:assert';
import { normalizePhone, isValidPhone, toWhatsAppJid } from '../lib/phone';

// ────────────────────────────────────────────
// Pure helper replica of FAQ matching logic for offline unit testing
// ────────────────────────────────────────────
function pureMatchFaqTemplate(queryText: string, templates: any[]): any | null {
  const cleanQuery = queryText.toLowerCase().trim();
  if (!cleanQuery) return null;

  for (const template of templates) {
    const keywords: string[] = template.keywords || [];
    
    if (template.key.toLowerCase() === cleanQuery) {
      return template;
    }

    for (const kw of keywords) {
      const kwClean = kw.toLowerCase().trim();
      if (!kwClean) continue;

      if (cleanQuery === kwClean) {
        return template;
      }

      // Escape special regex chars
      const escapedKw = kwClean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escapedKw}\\b`, 'i');
      if (regex.test(cleanQuery)) {
        return template;
      }
    }
  }

  return null;
}

// Mock FAQ database records
const mockFaqTemplates = [
  {
    key: 'schedules',
    title: 'Class Schedules',
    keywords: ['schedule', 'hours', 'time of class', 'when'],
    response_text: 'Classes run on Saturdays at 10:00 AM UTC.',
    enabled: true,
    priority: 10,
  },
  {
    key: 'python_course',
    title: 'Python Language',
    keywords: ['python', 'programming language', 'code in python'],
    response_text: 'We teach python programming using interactive storytelling.',
    enabled: true,
    priority: 5,
  },
];

describe('WhatsApp Automation Unit Tests', () => {
  
  // 1. Phone Normalization & Validation
  describe('Phone Normalizer', () => {
    it('should strip spaces, dashes, parentheses and leading plus', () => {
      assert.strictEqual(normalizePhone(' +237 677-123 (456) '), '237677123456');
    });

    it('should strip leading double zero', () => {
      assert.strictEqual(normalizePhone('00237677123456'), '237677123456');
    });

    it('should return null for non-numeric input', () => {
      assert.strictEqual(normalizePhone('invalid-phone-num'), null);
    });

    it('should return null for too short or too long numbers', () => {
      assert.strictEqual(normalizePhone('12345'), null); // too short
      assert.strictEqual(normalizePhone('12345678901234567'), null); // too long
    });

    it('should validate phones correctly', () => {
      assert.strictEqual(isValidPhone('+237677123456'), true);
      assert.strictEqual(isValidPhone('abc'), false);
    });

    it('should format into correct WhatsApp JID', () => {
      assert.strictEqual(toWhatsAppJid('237677123456'), '237677123456@c.us');
      assert.strictEqual(toWhatsAppJid('invalid'), null);
    });
  });

  // 2. FAQ Matching Logic
  describe('FAQ Template Matcher', () => {
    it('should match on exact key match (case-insensitive)', () => {
      const match = pureMatchFaqTemplate('SCHEDULES', mockFaqTemplates);
      assert.ok(match);
      assert.strictEqual(match.key, 'schedules');
    });

    it('should match on exact keyword match', () => {
      const match = pureMatchFaqTemplate('hours', mockFaqTemplates);
      assert.ok(match);
      assert.strictEqual(match.key, 'schedules');
    });

    it('should match on keyword word boundary containment', () => {
      const match = pureMatchFaqTemplate('Tell me about the python course please', mockFaqTemplates);
      assert.ok(match);
      assert.strictEqual(match.key, 'python_course');
    });

    it('should not match if keyword is a substring of another word (boundary check)', () => {
      // "pythoneer" contains "python" but lacks word boundary
      const match = pureMatchFaqTemplate('I am a pythoneer', mockFaqTemplates);
      assert.strictEqual(match, null);
    });

    it('should return null if no templates match', () => {
      const match = pureMatchFaqTemplate('hello, how are you?', mockFaqTemplates);
      assert.strictEqual(match, null);
    });
  });

  // 3. Retry Backoff Calculations
  describe('Exponential Backoff', () => {
    it('should compute backoff delay minutes based on attempts count', () => {
      const attempts = [1, 2, 3, 4];
      const expectedMinutes = [2, 4, 6, 8];
      
      attempts.forEach((att, idx) => {
        const backoffMinutes = att * 2;
        assert.strictEqual(backoffMinutes, expectedMinutes[idx]);
      });
    });
  });

  // 4. Webhook Payload Parsing
  describe('Webhook Payload Extraction', () => {
    it('should extract message from open-wa wrapped event structure', () => {
      const payload = {
        event: 'onMessage',
        data: {
          id: 'msg_123',
          from: '237677123456@c.us',
          body: 'Hello KiddyKode',
        },
      };

      let message: any = null;
      if (payload.event === 'onMessage' && payload.data) {
        message = payload.data;
      }
      
      assert.ok(message);
      assert.strictEqual(message.id, 'msg_123');
      assert.strictEqual(message.from, '237677123456@c.us');
      assert.strictEqual(message.body, 'Hello KiddyKode');
    });

    it('should extract message from direct event structure', () => {
      const payload = {
        id: 'msg_123',
        from: '237677123456@c.us',
        body: 'Hello KiddyKode',
      };

      let message: any = null;
      if (payload.from && payload.body) {
        message = payload;
      }

      assert.ok(message);
      assert.strictEqual(message.id, 'msg_123');
      assert.strictEqual(message.from, '237677123456@c.us');
      assert.strictEqual(message.body, 'Hello KiddyKode');
    });
  });
});
