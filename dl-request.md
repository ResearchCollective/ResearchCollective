```
Request body for digital driver's license ID claim
{
    'applicant_firstname': 'Eric',
    'applicant_middlename': 'Kirk',
    'applicant_lastname': 'Badiere',
    'applicant_dob_month': '05',
    'applicant_dob_day': '18',
    'applicant_dob_year': '1969',
    'applicant_address': '9940 W. 86th Pl',
    'applicant_city': 'Arvada',
    'applicant_state': 'CO',
    'applicant_zip': '80005',
    'applicant_ssn': '999999999',
    'applicant_ssn_confirmation': '999999999',
    'ip': '10.1.10.222',
    'dl_number': '960430625',
    'dl_state': 'CO',
    'auth_agree': 'Y',
    'ethereum_address' => '0x6F49895365D4F8878EE3e6B66A6F8234B854990b'
}
```

Response body for digital driver's license verifiable ID Claim

```
{
    "data": {
        "header": {
            "typ": "JWT",
            "alg": "ES256K"
        },
        "payload": {
            "iat": 1581807574,
            "@context": [
                "https://www.w3.org/2018/credentials/v1",
                "https://www.w3.org/2018/credentials/mvr/example/v1"
            ],
            "id": "https://www.clearchecks.com/credentials/mvr",
            "type": [
                "VerifiableCredential",
                "DriverLicenseCredential"
            ],
            "issuer": "https://www.clearchecks.com/credentials/",
            "issuanceDate": "2010-01-01T19:73:24Z",
            "txnHash": "0x769b354a38208347d8373d1cae2ddc2b936c251983935248fe0cfa353e35bd61",
            "credentialSubject": {
                "id": "did:colorado.dmv:16a69880c79e77f0a16a210035a1e18d",
                "givenName": "Eric",
                "familyName": "Badiere",
                "dateOfBirth": {
                    "day": "18",
                    "month": "05",
                    "year": "1969"
                },
                "stateOf": {
                    "id": "did:colorado:c276e12ec21ebfeb1f712ebc6f1",
                    "name": [
                        {
                            "value": "CO",
                            "lang": "en",
                            "dlNumber": "960430625"
                        }
                    ]
                }
            },
            "iss": "did:3:bafyreibbyoksa3kftxpxaqd7xkdufrsr5vkybwxpcqyezzxire45oxqq4u"
        },
        "signature": "6qb6LjEeLWzzKy8IzHsZlVi66dZBVU2SjhmQvQ9KTde9NsjLB-vv9FFhx9Gy4-LB8cUSCiQlHZ5zgnwVyOQMdQ",
        "data": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpYXQiOjE1ODE4MDc1NzQsIkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIiwiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvbXZyL2V4YW1wbGUvdjEiXSwiaWQiOiJodHRwczovL3d3dy5jbGVhcmNoZWNrcy5jb20vY3JlZGVudGlhbHMvbXZyIiwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCIsIkRyaXZlckxpY2Vuc2VDcmVkZW50aWFsIl0sImlzc3VlciI6Imh0dHBzOi8vd3d3LmNsZWFyY2hlY2tzLmNvbS9jcmVkZW50aWFscy8iLCJpc3N1YW5jZURhdGUiOiIyMDEwLTAxLTAxVDE5OjczOjI0WiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmNvbG9yYWRvLmRtdjoxNmE2OTg4MGM3OWU3N2YwYTE2YTIxMDAzNWExZTE4ZCIsImdpdmVuTmFtZSI6IkVyaWMiLCJmYW1pbHlOYW1lIjoiQmFkaWVyZSIsImRhdGVPZkJpcnRoIjp7ImRheSI6IjE4IiwibW9udGgiOiIwNSIsInllYXIiOiIxOTY5In0sInN0YXRlT2YiOnsiaWQiOiJkaWQ6Y29sb3JhZG86YzI3NmUxMmVjMjFlYmZlYjFmNzEyZWJjNmYxIiwibmFtZSI6W3sidmFsdWUiOiJDTyIsImxhbmciOiJlbiIsImRsTnVtYmVyIjoiOTYwNDMwNjI1In1dfX0sImlzcyI6ImRpZDozOmJhZnlyZWliYnlva3NhM2tmdHhweGFxZDd4a2R1ZnJzcjV2a3lid3hwY3F5ZXp6eGlyZTQ1b3hxcTR1In0"
    },
    "statusCode": 200
}
```

Declined response for legal reasons:

```
{
    "data": {
        "message": "Data submitted does not match state records"
    },
    "status": 451
}
```

Decline response for questionable applicant data:

```
{
    "data": {
        "message": "Data submitted not validated by accepted verifier"
    },
    "status": 451
}
```
