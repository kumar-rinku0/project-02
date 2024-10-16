const btns = document.querySelectorAll("#likes");

btns.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    console.log("btn clicked!");
  });
});
