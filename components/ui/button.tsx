// Button
const Button = ({ onClick, children, variant = 'primary', size = 'md', disabled = false, icon: Icon }: {
  onClick?: () => void,
  children: React.ReactNode,
  variant?: 'primary' | 'secondary' | 'danger',
  size?: 'sm' | 'md',
  disabled?: boolean,
  icon?: any
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const sizeClasses = size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-base';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:hover:bg-blue-600',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:hover:bg-red-600'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses} ${variantClasses[variant]}`}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
};

export default Button;