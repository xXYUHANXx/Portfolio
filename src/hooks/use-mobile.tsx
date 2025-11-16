import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Asegurarse de que el código solo se ejecute en el cliente
    if (typeof window === 'undefined') {
      return;
    }

    const checkDevice = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Comprobar al montar y al cambiar el tamaño de la ventana
    checkDevice();
    window.addEventListener('resize', checkDevice);

    // Limpiar el event listener al desmontar
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return isMobile;
}
