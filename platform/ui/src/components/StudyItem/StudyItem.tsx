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
      <div className="mx-1 flex flex-1 flex-col pb-2">
        <div className="flex flex-col pt-2 pb-2">
          {/* Make Smaller Than Font Of Date That Display In The Panel */}
          <section className="my-2">
            <div className="ml-2 flex-grow whitespace-nowrap text-[13px] text-white">{date}</div>
          </section>
          <section className="my-2">
            <div className="ml-2 flex flex-row text-[13px] text-white">
              <Icon
                name="group-layers"
                className="mr-2 w-4 text-blue-300"
              />
              {numInstances}
            </div>
          </section>
          <section className="my-2">
            <div className="ml-2 flex-grow text-[13px] text-white">{modalities}</div>
          </section>
          <section className="my-2">
            <div className="truncate-2-lines ml-2 break-words text-[13px] text-white">
              {description}
            </div>
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
