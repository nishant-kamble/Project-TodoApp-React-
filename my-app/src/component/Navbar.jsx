const Navbar = ({ setShowBin }) => {
  return (
    <nav className="flex justify-between bg-indigo-900 text-white py-3">
      <div>
        <span className="font-bold text-xl mx-8">ITask</span>
      </div>

      <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer hover:font-bold transition-all gap-8">
          Home
        </li>

        <li className="cursor-pointer hover:font-bold transition-all gap-8">
          Your Tasks
        </li>

        <li
          onClick={() => setShowBin(true)}
          className="cursor-pointer hover:font-bold transition-all"
        >
          🗑️ Bin
        </li>
      </ul>
    </nav>
  )
}

export default Navbar