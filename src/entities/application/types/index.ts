export interface IApplicationApi {
    // id: string,
    // number: string,
    // user_id: string,
    // brand: string,
    // photo: string,
    // request_created: string

    id: number,
    created_at: string,
    status: string,
    cause: string,
    car_num: string,
    car_id: number,
    car_brand: string,
    photo: string
}

// {
//     "ID": 1,
//     "CreatedAt": "2024-09-19T19:58:06.78+03:00",
//     "UpdatedAt": "0001-01-01T00:00:00Z",
//     "DeletedAt": null,
//     "User": {
//         "ID": 0,
//         "CreatedAt": "0001-01-01T00:00:00Z",
//         "UpdatedAt": "0001-01-01T00:00:00Z",
//         "DeletedAt": null,
//         "Name": "",
//         "Phone": "",
//         "Img": "",
//         "Lang": "",
//         "Role": "",
//         "Theme": "",
//         "FreeCount": 0,
//         "Ban": null,
//         "SubscriptionExpire": null,
//         "Tokens": null,
//         "Owns": null,
//         "Active": false
//     },
//     "UserID": 0,
//     "Car": {
//         "ID": 0,
//         "CreatedAt": "0001-01-01T00:00:00Z",
//         "UpdatedAt": "0001-01-01T00:00:00Z",
//         "DeletedAt": null,
//         "Num": "",
//         "Name": "",
//         "Brand": "",
//         "Owners": null,
//         "Active": false
//     },
//     "CarID": 0,
//     "Status": "wait",
//     "Cause": "",
//     "Files": null,
//     "AdminEdited": 0
// }