function scrollAnim() {
  if (animItems.length > 0) {
    animItems.forEach((element) => {
      let animItem = element
      let animItemHeight = animItem.offsetHeight;
      let animItemOffest = offset(animItem);
      let animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemPoint > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (pageYOffset > animItemOffest - animItemPoint) {
        animItem.classList.add('animate-active');
        setTimeout(() => {
          progresBar()
        }, 300);
      }
    });
  }
}
function offset(item) {
  let rect = item.getBoundingClientRect(),
    top = window.pageYOffset + rect.top
  return top
}