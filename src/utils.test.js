import { isLikeEvent, resolveLikes, memo } from "./utils"

test('like event detection', () => {
    expect(isLikeEvent("/like 123")).toBe(true)
    expect(isLikeEvent("/unlike ")).toBe(true)
    expect(isLikeEvent("/like")).toBe(false)
    expect(isLikeEvent("/unlike")).toBe(false)
    expect(isLikeEvent()).toBe(false)
    expect(isLikeEvent(" /like")).toBe(false)
})


const messages = [
    { "type": "chat", "author": "did:3:alice", "message": "hello world", "timestamp": 1575951305, "postId": "bafyreiekubbmqlobtqhgwwvhj4o75474qklu3ogqwwivs7z2j2n7jymnrq" },
    { "type": "chat", "author": "did:3:mallory", "message": "/like __proto__", "timestamp": 1575951310, "postId": "bafyreidfuaofqupxnswabpoyuorl2by4jta4md3uj5lzji354chwvv7gry" },
    { "type": "chat", "author": "did:3:alice", "message": "/like bafyreiekubbmqlobtqhgwwvhj4o75474qklu3ogqwwivs7z2j2n7jymnrq", "timestamp": 1575951310, "postId": "bafyreidfuaofqupxnswabpoyuorl2by4jta4md3uj5lzji354chwvv7gry" },
    { "type": "chat", "author": "did:3:bob", "message": "/like bafyreiekubbmqlobtqhgwwvhj4o75474qklu3ogqwwivs7z2j2n7jymnrq", "timestamp": 1575951323, "postId": "bafyreigb2slpy4u3uvh3kttvacrjfaaimwouqucwr5djmukpxkigshnlq4" },
    { "type": "chat", "author": "did:3:bob", "message": "/unlike bafyreiekubbmqlobtqhgwwvhj4o75474qklu3ogqwwivs7z2j2n7jymnrq", "timestamp": 1575951325, "postId": "bafyreiaqbi56mdwh4fnelqkf6ppjuajg7tdlr2aeglkz4cqwznhpat6y7u" }
]

const likes = new Map([["bafyreiekubbmqlobtqhgwwvhj4o75474qklu3ogqwwivs7z2j2n7jymnrq", ["did:3:alice"]], ["__proto__", ["did:3:mallory"]]])

test("resolving likes", () => {
    expect(resolveLikes(messages)).toEqual(likes)
})

test("single argument memoization", () => {
    const addOne = memo(n => n + 1)
    expect(addOne(1)).toBe(2)
    expect(addOne(1)).toBe(2)
})