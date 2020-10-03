const retirarMask = (value) => {
    if (!value) {
        return null;
      } 
      return value.replace(/\D/g, "");
}

export default retirarMask;