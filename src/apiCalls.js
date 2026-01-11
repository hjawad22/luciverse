export function fetchQuotes() {
   return fetch("https://luciverse-api.onrender.com/api/quotes")
        .then(res => {
            if (!res.ok) {
                throw new Error("Oops! We seem to be having some technical issues, please try again later!");
            }
            return res.json();
        });
};

export function postQuote(quote, character) {
    return fetch("https://luciverse-api.onrender.com/api/quotes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ quote, character })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Failed to add quote. Please try again.");
        }
        return res.json();
    });
}