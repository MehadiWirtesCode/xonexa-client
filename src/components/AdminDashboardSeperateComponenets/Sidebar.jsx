export const SidebarItem = ({ name, Icon, onClick, isAction = false }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 p-3 w-full text-left rounded-xl transition-colors 
      ${name === "Dashboard" ? "bg-gray-100 text-gray-700 shadow-md" : "text-gray-600 hover:bg-indigo-100 hover:text-indigo-600"}
      ${isAction ? "border border-dashed border-indigo-300 hover:border-indigo-600 bg-indigo-50" : ""}
    `}
  >
    <Icon size={20} /> <span className="font-medium">{name}</span>
  </button>
);

