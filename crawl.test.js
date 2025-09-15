const {normalizeUrl, getURLsFromHTML} = require('./crawl.js');
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

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
    <body>
        <a href = "https://google.com/"> 
        Welcome to Google
        </a>
    </body>
    </html>`;

    const inputBaseURL = 'https://google.com';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://google.com/'];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
    <body>
        <a href = "/path/"> 
        Welcome to Google
        </a>
    </body>
    </html>`;

    const inputBaseURL = 'https://google.com';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://google.com/path/'];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML both', () => {
    const inputHTMLBody = `
    <html>
    <body>
        <a href = "https://google.com/path1/"> 
        Welcome to Google, path 1
        </a>
        <a href = "/path2/"> 
        Welcome to Google, path 2
        </a>
    </body>
    </html>`;

    const inputBaseURL = 'https://google.com';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://google.com/path1/', 'https://google.com/path2/'];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
    <html>
    <body>
        <a href = "invalid"> 
        Invalid URL
        </a>
    </body>
    </html>`;

    const inputBaseURL = 'https://google.com';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
});