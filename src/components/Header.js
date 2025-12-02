export default function Header() {
  return (
    <div className="navbar bg-base-200 rounded-xl mb-4 shadow">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/8e/OOjs_UI_icon_shopping-cart.svg"
            className="w-10"
          />
          <div>
            <h1 className="text-xl font-bold">Product Management App</h1>
            <p className="text-xs opacity-70">React + DaisyUI</p>
          </div>
        </div>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a href="/">Products</a></li>
          <li><a href="/">Add Product</a></li>
        </ul>
      </div>
    </div>
  );
}
