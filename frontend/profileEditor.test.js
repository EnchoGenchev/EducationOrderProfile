// profileEditor.test.js
const script = require('../frontend/script'); // Path to your script.js

describe('Validation Functions', () => {

    it('should count words correctly', () => {
        expect(script.wordCount("This is a test string")).toBe(5);
        expect(script.wordCount(" ")).toBe(0);
        expect(script.wordCount("")).toBe(0);
    });

    it('should limit description to 75 words', () => {
        const shortDescription = 'This is a short description. It has less than 75 words.';
        const longDescription = 'This is a very long description. It is designed to be longer than 75 words to test the word count limitation. We are adding more and more words to ensure that it exceeds the limit of seventy-five. I am still writing, because I have to ensure it exceeds. It is over 75 words. I can still add more. It is now, for sure, over 75 words. Is it? Yes, it has to be. Done.';

        expect(script.validateDescription(shortDescription)).toBe(shortDescription);
        expect(script.wordCount(script.validateDescription(longDescription))).toBeLessThanOrEqual(75);
    });

    describe('Username Validation', () => {
        const specialCharRegex = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?\s]/; // Regex to check for special characters and spaces

        const isValidUsername = (username) => {
            if (!username) return false; // Check for empty string
            return !specialCharRegex.test(username);
        };

        it('should validate a valid username', () => {
            expect(isValidUsername("validUsername123")).toBe(true);
            expect(isValidUsername("anotherValidUsername")).toBe(true);
            expect(isValidUsername("user1")).toBe(true);
        });

        it('should invalidate an invalid username', () => {
            expect(isValidUsername("invalid-username")).toBe(false);
            expect(isValidUsername("invalid username")).toBe(false);
            expect(isValidUsername("invalidUsername!")).toBe(false);
            expect(isValidUsername("invalidUsername@")).toBe(false);
            expect(isValidUsername("")).toBe(false); // Empty username should be invalid
        });
    });
});