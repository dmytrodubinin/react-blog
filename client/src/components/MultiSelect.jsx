import PropTypes from 'prop-types';

const MultiSelect = ({ options, selectedOptions, setSelectedOptions }) => {
  const handleSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="dropdown dropdown-hover">
        <label tabIndex={0} className="btn btn-outline btn-sm">
          Select Categories
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content max-h-60 w-52 overflow-y-auto rounded-box bg-base-100 p-2 shadow"
        >
          {options.map((option) => (
            <li key={option} className="menu-item">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox-primary checkbox mr-2"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleSelect(option)}
                />
                <span className="label-text">{option}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="badge badge-outline p-2">
        {selectedOptions.length > 0 ? (
          selectedOptions.join(', ')
        ) : (
          <span className="text-gray-400">No categories selected</span>
        )}
      </div>
    </div>
  );
};

MultiSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedOptions: PropTypes.func.isRequired,
};

export default MultiSelect;
