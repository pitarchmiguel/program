export { renderers } from '../../renderers.mjs';

const POST = async ({ cookies }) => {
  try {
    cookies.delete("session", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });
    return new Response(JSON.stringify({
      success: true,
      message: "¡Hasta pronto! Has cerrado sesión correctamente",
      redirect: "/"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Error al cerrar sesión"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
