const {sortPages} = require('./report.js');
const {test, expect} = require('@jest/globals');

test('sortPages 2 pages', () => {
    const input = {
        'https://google.com/path':4,
        'https://google.com':7
    }
    const actual = sortPages(input);
    const expected = [
        ['https://google.com', 7],
        ['https://google.com/path', 4]
    ];
    expect(actual).toEqual(expected);
});


test('sortPages 5 pages', () => {
    const input = {
        'https://google.com/path1':2,
        'https://google.com':5,
        'https://google.com/path2':3,
        'https://google.com/path3':1,
        'https://google.com/path4':9,
    }
    const actual = sortPages(input);
    const expected = [
        ['https://google.com/path4', 9],
        ['https://google.com', 5],
        ['https://google.com/path2', 3],
        ['https://google.com/path1', 2],
        ['https://google.com/path3', 1]
    ];
    expect(actual).toEqual(expected);
});