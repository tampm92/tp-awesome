"use strict";

/**
 * include packages
 */
import * as crypto from "crypto";

/**
 * HashString
 */
export class HasherString {
    saltLength = 24;

    public createHash(data: string): string {
        var salt = this.generateSalt(this.saltLength);
        var hash = this.md5(data + salt);
        return salt + hash;
    }

    public validateHash(hash: string, data: string): boolean {
        var salt = hash.substr(0, this.saltLength);
        var validHash = salt + this.md5(data + salt);
        return hash === validHash;
    }

    private generateSalt(lenght: number): string {
        var set = 'abcdefghijk0123456789ABCDEFGHIJKlmnopqurstuvwxyzLMNOPQURSTUVWXYZ',
            setLen = set.length,
            salt = '';
        for (var i = 0; i < lenght; i++) {
            var p = Math.floor(Math.random() * setLen);
            salt += set[p];
        }
        return salt;
    }

    private md5(data: string): string {
        return crypto.createHash('md5').update(data).digest('hex');
    }
}