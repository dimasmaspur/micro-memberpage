import React, { Children, useState, useRef, useEffect } from "react";
import propTypes from "prop-types";

export default function Select({
  labelName,
  id,
  name,
  value,
  className,
  children,
  onClick,
  fallbackText,
}) {
  const [toggle, settoggle] = useState(() => false);
  const selectWrapper = useRef(null);

  const items = Children.toArray(children);

  function toggleSelect() {
    settoggle(() => !toggle);
  }

  function clickOutside(event) {
    if (selectWrapper && !selectWrapper.current.contains(event.target))
      settoggle(false);
  }

  useEffect(() => {
    window.addEventListener("mousedown", clickOutside);
    return () => {
      window.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  const selected = items.find((item) => item.props.value === value);

  return (
    <div className="flex flex-col mb-4">
      {labelName && (
        <label htmlFor="" className="show text-lg mb-2 text-gray-900">
          {labelName}
        </label>
      )}
      <div className="relative" ref={selectWrapper} onClick={toggleSelect}>
        <div
          className={[
            "flex justify-between cursor-pointer rounded-md bg-white focus:outline-none transition-all duration-200 border px-4 py-3 w-full",
            toggle ? "border-green-500" : "border-gray-600",
            className,
          ].join(" ")}
        >
          <span className={value === "" ? "text-gray-500" : ""}>
            {selected?.props.children ?? fallbackText}
          </span>
          <div className="transition-all duration-200 border-gray-400 border-b-2 border-r-2 transform rotate-45 translate-y-1 w-2 h-2 "></div>
        </div>
        <div
          className={[
            "absolute left-0 bg-white border border-gray-600 py-3 w-full",
            toggle ? "" : "hidden",
          ].join(" ")}
        >
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className="cursor-pointer px-4 py-1 bg-white hover:bg-gray-400 transition-all duration-200"
                onClick={() =>
                  onClick({ target: { name: name, value: item.props.value } })
                }
              >
                {item.props.children}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Select.propTypes = {
  onClick: propTypes.func.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  name: propTypes.string.isRequired,
  fallbackText: propTypes.string,

  labelName: propTypes.string,
  id: propTypes.string,
  className: propTypes.string,
};
