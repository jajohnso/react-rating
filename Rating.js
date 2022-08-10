import React, {useMemo} from "react";
import PropTypes from "prop-types";
import RatingIcon from "./RatingIcon";
/**
 *
 * Rating
 * This component utilizes a single SVG icon that repeated for n number of rating icons (default 5).
 * The SVGs fill attribute is dynamically populated based on its percentage. If it's zero, the icon will be given a solid fill equal to the CSS custom property `var(--ratingEmpty)`. Similarly, a full icon will receive a property `var(--ratingFull)`. If it's a partially filled icon it a `<linearGradient>` element will be added to the page and used to render the partial value. Using a hard stop on a gradient allows us to generate the fill simply by moving the stop positions on the gradient.
 *
 * This approach makes the component much more flexible than employing a masked base rendering since strokes can now be used on the icons since there is no clipping paths involved. The icons are also much easier to update and swap out since they are just a simple single icon SVG file.
 *
 */
// TODO: this icon is currently coded to be a star. In the future, if themes require other icon types, an SVG could be passed to the component as a prop or if we wanted to configure this per site, a string could be passed as a prop to change the select an icon type from a set list.
export default function Rating({rating, id = "", ratingIconCount = 5}) {
    function getRatingObj(index, _rating) {
        // strip off any decimals, so we know how many full stars we're dealing with
        const fullRatingCount = Math.floor(_rating);
        const partialRatingValue = _rating % Math.floor(_rating);

        // this needs to be unique per rating since it's an id
        // TODO: find a better way to make each one unique on the page so that we never run the risk of duplicate ids on a page
        const ratingId = `gradient${partialRatingValue * 100}-${index}-${id}`;

        // defaults
        let currentRating = {
            value: 0,
            fill: "var(--ratingEmpty)",
            id: ratingId
        };

        // full stars
        if (index <= fullRatingCount) {
            currentRating = {
                value: 100,
                fill: "var(--ratingFull)",
                id: ratingId
            };
        }

        // partial stars
        if (index === fullRatingCount + 1) {
            currentRating = {
                value: partialRatingValue * 100,
                fill: `url(#${ratingId})`,
                id: ratingId
            };
        }
        return currentRating;
    }

    const memoizedRatingIcons = useMemo(() => {
        const ratingIcons = [];
        // old school for loop here since we're generating this from a dynamic count
        // eslint-disable-next-line  no-plusplus
        for (let index = 1; index <= ratingIconCount; index++) {
            ratingIcons.push(getRatingObj(index, rating));
        }

        return ratingIcons;
    }, [rating, ratingIconCount]);

    return (
        <div className="rating">
            <div className="rating__graphic">
                {memoizedRatingIcons.map((icon) => {
                    return (
                        <div className="rating__icon" key={icon.id}>
                            {icon.value !== 100 && icon.value !== 0 && (
                                <svg xmlns="http://www.w3.org/2000/svg" height={0} width={0}>
                                    <linearGradient id={icon.id}>
                                        <stop offset={`${icon.value}%`} stopColor="var(--ratingFull)" />
                                        <stop offset={`${icon.value}%`} stopColor="var(--ratingEmpty)" />
                                    </linearGradient>
                                </svg>
                            )}
                            <RatingIcon fill={icon.fill} />
                        </div>
                    );
                })}
            </div>

            <div className="rating__value">{rating}</div>
        </div>
    );
}

Rating.propTypes = {
    rating: PropTypes.number.isRequired,
    ratingIconCount: PropTypes.number,
    id: PropTypes.string.isRequired
};
