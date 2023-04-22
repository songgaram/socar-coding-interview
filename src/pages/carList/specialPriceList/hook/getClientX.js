const getClientX = (event) => {
  return event._reactName === "onTouchStart"
    ? event.touches[0].clientX
    : event._reactName === "onTouchMove" || event._reactName === "onTouchEnd"
    ? event.changedTouches[0].clientX
    : event.clientX;
};

export default getClientX;
