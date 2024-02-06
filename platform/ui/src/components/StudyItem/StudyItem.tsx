import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import Icon from '../Icon';

// const baseClasses =
//   'first:border-0 border-t border-secondary-light cursor-pointer select-none outline-none';
const baseClasses = 'first:border-0 border-t border-secondary-light h-[100%]';

const StudyItem = ({
  date,
  description,
  numInstances,
  modalities,
  trackedSeries,
  isActive,
  onClick,
}) => {
  const { t } = useTranslation('StudyItem');
  return (
    <div
      className={classnames(
        isActive ? 'bg-primary-main' : 'hover:bg-secondary-main bg-primary-dark',
        baseClasses
      )}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex="0"
    >
      <div className="mx-1 flex h-[9rem] flex-col">
        <div className="absolute -left-11 mt-12 ml-10 flex -rotate-90 flex-col pt-2 pb-2">
          {/* Make Smaller Than Font Of Date That Display In The Panel */}
          <section className="">
            <div className=" mb-1 whitespace-nowrap text-[10px] text-white">{date}</div>
          </section>
          <section className="">
            <div className=" text-[10px] text-white">{modalities}</div>
          </section>
        </div>
        {/* Make Smaller Than Font Of Date That Display In The Panel */}
      </div>
      {!!trackedSeries && (
        <div className="flex-2 flex">
          <div
            className={classnames(
              'bg-secondary-main mt-2 flex flex-row py-1 pl-2 pr-4 text-base text-white ',
              isActive
                ? 'border-secondary-light flex-1 justify-center border-t'
                : 'mx-4 mb-4 rounded-sm'
            )}
          >
            <Icon
              name="tracked"
              className="text-primary-light mr-2 w-4"
            />
            {t('Tracked series', { trackedSeries: trackedSeries })}
          </div>
        </div>
      )}
    </div>
  );
};

StudyItem.propTypes = {
  date: PropTypes.string.isRequired,
  description: PropTypes.string,
  modalities: PropTypes.string.isRequired,
  numInstances: PropTypes.number.isRequired,
  trackedSeries: PropTypes.number,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default StudyItem;
