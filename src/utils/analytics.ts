// Calltouch & Yandex.Metrika integration utilities
// Calltouch settings from cabinet:
// ID личного кабинета (site_id): 16642
// ID счетчика (mod_id): 26272840

export const CALLTOUCH_SITE_ID = '16642';
export const CALLTOUCH_MOD_ID = '26272840';
export const YANDEX_METRIKA_ID = 110944517;
export const WEB3FORMS_ACCESS_KEY = 'de59e5a7-a572-4fd3-b285-86fabde267ce';

export interface LeadPayload {
  fio: string;
  phoneNumber: string;
  subject: string;
  source: string;
  city?: string;
  service?: string;
  dealerCenter?: string;
  preferredDate?: string;
  preferredTime?: string;
  carModel?: string;
  comment?: string;
  specialOffer?: string;
}

declare global {
  interface Window {
    ct?: (...args: any[]) => any;
    ym?: (id: number, action: string, target: string, params?: Record<string, any>) => void;
  }
}

/**
 * Retrieves Calltouch sessionId for counter 26272840 if loaded
 */
export function getCalltouchSessionId(): string | undefined {
  try {
    if (typeof window !== 'undefined' && typeof window.ct === 'function') {
      const byModId = window.ct('calltracking_params', CALLTOUCH_MOD_ID);
      if (byModId && byModId.sessionId) {
        return String(byModId.sessionId);
      }
      const defaultParams = window.ct('calltracking_params');
      if (defaultParams && defaultParams.sessionId) {
        return String(defaultParams.sessionId);
      }
    }
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/(?:^|;\s*)_ct_session_id=([^;]*)/);
      if (match && match[1]) {
        return decodeURIComponent(match[1]);
      }
    }
  } catch {
    // Ignore errors if Calltouch script is blocked by browser extension
  }
  return undefined;
}

/**
 * Normalizes phone number to digits only (e.g., 79991234567)
 */
export function normalizePhoneDigits(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('8')) {
    return '7' + digits.slice(1);
  }
  if (digits.length === 10) {
    return '7' + digits;
  }
  return digits;
}

/**
 * Validates that a masked phone input contains a full 11-digit Russian phone number
 */
export function isValidRussianPhone(phone: string): boolean {
  const digits = normalizePhoneDigits(phone);
  return digits.length === 11 && digits.startsWith('7');
}

/**
 * Sends lead data to Calltouch Requests API (site_id: 16642)
 * Uses official endpoint https://api.calltouch.ru/calls-service/RestAPI/requests/16642/register/
 */
export async function sendCalltouchLead(payload: LeadPayload): Promise<boolean> {
  try {
    const sessionId = getCalltouchSessionId();
    const cleanPhone = normalizePhoneDigits(payload.phoneNumber);

    const commentParts: string[] = [];
    if (payload.city) commentParts.push(`Город: ${payload.city}`);
    if (payload.dealerCenter) commentParts.push(`ДЦ: ${payload.dealerCenter}`);
    if (payload.service) commentParts.push(`Услуга: ${payload.service}`);
    if (payload.specialOffer) commentParts.push(`Акция: ${payload.specialOffer}`);
    if (payload.carModel) commentParts.push(`Авто: ${payload.carModel}`);
    if (payload.preferredDate) {
      commentParts.push(
        `Дата/время: ${payload.preferredDate}${payload.preferredTime ? ` ${payload.preferredTime}` : ''}`
      );
    }
    if (payload.comment) commentParts.push(`Комментарий: ${payload.comment}`);

    const tags: string[] = [];
    if (payload.city) tags.push(payload.city);
    if (payload.source) tags.push(payload.source);
    if (payload.service) tags.push(payload.service.slice(0, 45));

    const detailedSubjectParts: string[] = [
      payload.subject || 'Заявка с сайта Прагматика Эксперт Сервис'
    ];
    if (payload.city) detailedSubjectParts.push(payload.city);
    if (payload.dealerCenter) detailedSubjectParts.push(payload.dealerCenter);

    const ctParams = new URLSearchParams();
    ctParams.append('fio', payload.fio.trim());
    ctParams.append('phoneNumber', cleanPhone);
    ctParams.append('subject', detailedSubjectParts.join(' — '));
    if (commentParts.length > 0) {
      ctParams.append('comment', commentParts.join(' | '));
    }
    if (tags.length > 0) {
      ctParams.append('tags', tags.join(','));
    }
    if (typeof window !== 'undefined') {
      ctParams.append('requestUrl', window.location.href);
    }
    if (sessionId) {
      ctParams.append('sessionId', sessionId);
    }

    const response = await fetch(
      `https://api.calltouch.ru/calls-service/RestAPI/requests/${CALLTOUCH_SITE_ID}/register/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: ctParams.toString(),
        keepalive: true,
      }
    );

    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Triggers Yandex.Metrika conversion goal
 */
export function reachMetrikaGoal(goalName: string, params?: Record<string, any>): void {
  try {
    if (typeof window !== 'undefined' && typeof window.ym === 'function') {
      window.ym(YANDEX_METRIKA_ID, 'reachGoal', goalName, params);
    }
  } catch {
    // Ignore if Metrika is blocked
  }
}

/**
 * Returns local YYYY-MM-DD date string safely in user's local timezone
 */
export function getLocalDateString(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
