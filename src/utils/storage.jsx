const storeBearerToken = (token) => {
    localStorage.setItem("bearerToken", token);
    console.log(getBearerToken());

    console.log("A");
}

const getBearerToken = () => {
    return localStorage.getItem("bearerToken");
}

export { storeBearerToken, getBearerToken };