import { useState } from 'react';
import { SORTING_OPTIONS, SortingOptionValue } from '../../const';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hook';
import { SortingOption } from '../../types/sorting-types/sorting';
import { setSortingOption } from '../../store/action';


function SortingOptions():JSX.Element {
  const dispatch = useAppDispatch();
  const selectedOption = useAppSelector((state) => state.sortingOption);

  const [isSortingOpen, setIsSortingOpen] = useState<boolean>(false);

  const selectedOptionTitle = SORTING_OPTIONS.find(
    (option: SortingOption) => option.value === selectedOption)?.title || SortingOptionValue.Popular;

  const handleSortingOpen = () => {
    setIsSortingOpen(!isSortingOpen);
  };

  const handleOptionClick = (option: SortingOption) => {
    dispatch(setSortingOption(option.value));
    setIsSortingOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortingOpen}>
        {selectedOptionTitle}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isSortingOpen && (
        <ul className={`places__options places__options--custom ${isSortingOpen ? 'places__options--opened' : ''}`}>
          {
            SORTING_OPTIONS.map((option) => (
              <li
                key={option.id}
                className={
                  classNames([
                    'places__option',
                    { 'places__option--active' : selectedOption === option.value }
                  ])
                }
                tabIndex={0}
                onClick={() => handleOptionClick(option)}
              >
                {option.title}
              </li>
            ))
          }
        </ul>
      )}
    </form>
  );
}

export default SortingOptions;
