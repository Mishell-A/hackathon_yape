export const showMessage = (mensaje, type) => {
  Toastify({
    text: mensaje,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    gravity: "top", // Se muestra en la parte superior
    position: "right", // Se alinea a la derecha
    stopOnFocus: true, // Previene que se cierre al hacer hover
    style: {
      background:
        type === "error"
          ? "radial-gradient(circle, rgba(208,43,61,1) 0%, rgba(103,58,183,1) 100%)" // Error: rojo a morado
          : type === "loading"
          ? "radial-gradient(circle, rgba(16,203,180,1) 0%, rgba(103,58,183,1) 100%)" // Loading: verde a morado
          : "radial-gradient(circle, rgba(16,203,180,1) 0%, rgba(116,35,132,1) 100%)", // Éxito: verde a morado claro
      color: "white", // Texto blanco
      position: "fixed", // Fijamos la posición para que no se mueva
      top: "20px", // Se coloca 20px desde la parte superior
      right: "20px", // Se coloca 20px desde la parte derecha
      zIndex: 9999, // Aseguramos que esté por encima de otros elementos
      borderRadius: "5px", // Bordes redondeados
      padding: "10px 15px", // Ajuste automático del padding horizontal según el texto
      maxWidth: "300px", // Limitar el ancho máximo del toast
      wordWrap: "break-word", // Para que el texto se ajuste al ancho y no se desborde
    },
    onClick: function () {}, // Callback después de hacer clic
  }).showToast();
};
