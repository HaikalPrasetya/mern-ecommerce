function Button({ children, customClass, ...props }) {
  return (
    <button
      type="button"
      className={`bg-green-700 px-3 py-3 rounded-md text-white text-lg font-semibold custom-box-shadow hover:translate-y-1 hover:translate-x-1 transition ease-in-out duration-150 w-fit ${customClass}`}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
