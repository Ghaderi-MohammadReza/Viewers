import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDrag } from 'react-dnd';
import Icon from '../Icon';
import { StringNumber } from '../../types';
import DisplaySetMessageListTooltip from '../DisplaySetMessageListTooltip';

/**
 * Display a thumbnail for a display set.
 */
const Thumbnail = ({
  displaySetInstanceUID,
  className,
  imageSrc,
  imageAltText,
  description,
  seriesNumber,
  numInstances,
  countIcon,
  messages,
  dragData,
  isActive,
  onClick,
  onDoubleClick,
}): React.ReactNode => {
  // TODO: We should wrap our thumbnail to create a "DraggableThumbnail", as
  // this will still allow for "drag", even if there is no drop target for the
  // specified item.
  const [collectedProps, drag, dragPreview] = useDrag({
    type: 'displayset',
    item: { ...dragData },
    canDrag: function (monitor) {},
  });

  return (
    <div
      className={classnames(
        className,
        'mx-2 mb-1 flex h-[6rem] w-[6rem] cursor-pointer  select-none flex-col outline-none'
      )}
      id={`thumbnail-${displaySetInstanceUID}`}
      data-cy={`study-browser-thumbnail`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      role="button"
      tabIndex="0"
    >
      <div
        ref={drag}
        className="w-[100%]"
      >
        <div
          className={classnames(
            'flex  h-[6rem] w-[6rem] items-center justify-center overflow-hidden rounded-md bg-black text-base text-white',
            isActive
              ? 'border-primary-light border-2'
              : 'border-secondary-light border hover:border-blue-300'
          )}
        >
          {imageSrc ? (
            <div
              style={{
                minHeight: '8rem',
                background: `url(${imageSrc})`,
                width: '100%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
          ) : (
            <div>{imageAltText}</div>
          )}
        </div>
        <div className="m-auto mt-2 flex w-[80%] flex-row justify-between text-base text-blue-300">
          <div>
            <span className="text-primary-main font-bold">{'S: '}</span>
            {seriesNumber}
          </div>
          <div className="mr-2 flex flex-row">
            <Icon
              name={countIcon || 'group-layers'}
              className="w-3"
            />
            {` ${numInstances}`}
          </div>
          <DisplaySetMessageListTooltip
            messages={messages}
            id={`display-set-tooltip-${displaySetInstanceUID}`}
          />
        </div>
        {/* <div className="break-all text-sm text-white">{description}</div> */}
      </div>
    </div>
  );
};

Thumbnail.propTypes = {
  displaySetInstanceUID: PropTypes.string.isRequired,
  className: PropTypes.string,
  imageSrc: PropTypes.string,
  /**
   * Data the thumbnail should expose to a receiving drop target. Use a matching
   * `dragData.type` to identify which targets can receive this draggable item.
   * If this is not set, drag-n-drop will be disabled for this thumbnail.
   *
   * Ref: https://react-dnd.github.io/react-dnd/docs/api/use-drag#specification-object-members
   */
  dragData: PropTypes.shape({
    /** Must match the "type" a dropTarget expects */
    type: PropTypes.string.isRequired,
  }),
  imageAltText: PropTypes.string,
  description: PropTypes.string.isRequired,
  seriesNumber: StringNumber.isRequired,
  numInstances: PropTypes.number.isRequired,
  messages: PropTypes.object,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

Thumbnail.defaultProps = {
  dragData: {},
};

export default Thumbnail;
