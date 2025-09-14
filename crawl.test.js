const {normalizeUrl} = require('./crawl.js');
const {test, expect} = require('@jest/globals');

test('normalizeUrl strip protocol', () => {
    const input = 'https://google.com/path'
    const actual = normalizeUrl(input);
    const expected = 'google.com/path';
    expect(actual).toEqual(expected);
});

test('normalizeUrl strip trailing slash', () => {
    const input = 'https://google.com/path/'
    const actual = normalizeUrl(input);
    const expected = 'google.com/path';
    expect(actual).toEqual(expected);
});

test('normalizeUrl capitals', () => {
    const input = 'https://GOOGLE.com/path/'
    const actual = normalizeUrl(input);
    const expected = 'google.com/path';
    expect(actual).toEqual(expected);
});

test('normalizeUrl strip http', () => {
    const input = 'http://google.com/path/'
    const actual = normalizeUrl(input);
    const expected = 'google.com/path';
    expect(actual).toEqual(expected);
});