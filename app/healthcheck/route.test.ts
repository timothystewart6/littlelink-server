import { describe, it, expect } from 'vitest';
import { GET } from './route';

describe('healthcheck route', () => {
  it('returns 200 with status ok', async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual({ status: 'ok' });
  });
});
