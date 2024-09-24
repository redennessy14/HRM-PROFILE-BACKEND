import { Email } from './email';

describe('Email', () => {
  test('Извлечение домена из адреса электронной почты', () => {
    const email = new Email('user@example.ru');

    expect(email.domain).toBe('@example.ru');
  });
  test('Извлечение юзернейма пользователя из адреса электронной почты', () => {
    const email = new Email('user@example.com');
    expect(email.username).toBe('user');
  });
  test('Сравнение одинаковых объектов email', () => {
    const email1 = new Email('user@example.com');
    const email2 = new Email('user@example.com');
    expect(email1.equals(email2)).toBe(true);
  });
  test('Сравнение различных объектов email', () => {
    const email1 = new Email('user@example.com');
    const email2 = new Email('differentuser@example.com@example.com');
    expect(email1.equals(email2)).toBe(false);
  });

  test('Корректное строковое представление адреса электронной почты', () => {
    const email = new Email('user@example.com');
    expect(email.toString()).toBe('user@example.com');
  });
});
