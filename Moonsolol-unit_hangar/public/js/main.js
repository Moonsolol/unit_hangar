function attackCheck() {
    const atkno = document.getElementByID("attacks");
    atkno.addEventListener("input", function(evt) {
        if(atkno.validity.typeMismatch) {
            atkno.setCustomValidity("Please input a number");
        } else {
            atkno.setCustomValidity("");
        }
    });
}
