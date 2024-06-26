// class User {
//     constructor(googleAuth) {
//         this.user_id = googleAuth.uid;
//         this.access_token = googleAuth.accessToken;
//         this.email = googleAuth.email;
//         this.first_name = googleAuth.displayName.split(" ")[0];
//         this.last_name = googleAuth.displayName.split(" ").slice(1).join(" ");
//         this.created_at = googleAuth.metadata.createdAt;
//         this.last_login = googleAuth.metadata.lastLoginAt;
//         this.admin = null;
//         this.transactions = [];
//         this.categories = [];
//     }
//
//     getCreatedAtString() {
//         return new Date(this.created_at).toString();
//     }
//
//     getLastLoginString() {
//         return new Date(this.last_login).toString();
//     }
//
//     async isNewUser() {
//         const url = ""; // Specify your URL here
//         const init = {}; // Specify your init object here
//
//         try {
//             const response = await fetch(url, init);
//             return response.ok; // Return true if the response is ok, otherwise false
//         } catch (error) {
//             console.error("Error checking if new user:", error);
//             return false;
//         }
//     }
// }
//
// export default User;


class User {
    constructor(googleAuth) {
        this.user_id = googleAuth.uid;
        this.access_token = googleAuth.accessToken;
        this.email = googleAuth.email;
        this.first_name = googleAuth.displayName.split(" ")[0];
        this.last_name = googleAuth.displayName.split(" ").slice(1).join(" ");
        this.created_at = googleAuth.metadata.createdAt;
        this.last_login = googleAuth.metadata.lastLoginAt;
        this.admin = null;
        this.transactions = [];
        this.categories = [];
    }

    getCreatedAtString() {
        return new Date(this.created_at).toString();
    }

    getLastLoginString() {
        return new Date(this.last_login).toString();
    }

    async isNewUser() {
        const url = ""; // Specify your URL here
        const init = {}; // Specify your init object here

        try {
            const response = await fetch(url, init);
            return response.ok; // Return true if the response is ok, otherwise false
        } catch (error) {
            console.error("Error checking if new user:", error);
            return false;
        }
    }
}

export default User;
