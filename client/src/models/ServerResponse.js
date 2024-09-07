class ServerResponse{
    constructor(data){
        this.payload = data?.payload ?? undefined;
        this.errors = data?.errors ?? undefined;
    }

    isSuccessful(){
        return this.errors.length === 0 && this.payload
    }
}

export default ServerResponse;