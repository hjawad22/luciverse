export function fetchQuotes() {
   return fetch("http://localhost:8000/api/quotes")
        .then(res => {
            if (!res.ok) {
                throw new Error("Oops! We seem to be having some technical issues, please try again later!");
            }
            return res.json();
        });
};

