/**
 * Please refer to the following files in the root directory:
 * 
 * README.md        For information about the package.
 * LICENSE          For license details, copyrights and restrictions.
 */
'use strict';

const { NunjucksShortcode, GAError, syslog, string } = require('gajn-framework');

class NunjucksShortcodeSocialSharesError extends GAError {}


/**
 * Social shares shortcode class.
 */
class SocialSharesShortcode extends NunjucksShortcode
{

    /**
     * Render.
     * 
     * @param   {object}    context     URL.
     * @param   {Array}     args        Other arguments.
     * 
     * @return  {string}
     */
    render(context, args)
    {
        if (!this.config.socialShares) {
            throw new NunjucksShortcodeSocialSharesError(`The social shares plugin requires a 'socialShares' definition in config.`);
        }

        let article = context.ctx;

        let ret = '';

        for (let item of this.config.socialShares.items) {
            if (!item.name) {
                throw new NunjucksShortcodeSocialSharesError(`A social share requires a 'name' field.`);
            }
            if (!item.link) {
                throw new NunjucksShortcodeSocialSharesError(`The ${item.name} social share requires a 'link' field.`);
            }

            let link = item.link;

            if (!article.title) {
                throw new NunjucksShortcodeSocialSharesError(`The ${item.name} social share requires an article 'title' field.`);
            }

            if (link.includes('(((wstitle)))') && !this.config.site.title) {
                throw new NunjucksShortcodeSocialSharesError(`The ${item.name} social share requires a 'site.title' field in the configs.`);
            }

            link = string.replaceAll(link, '(((url)))', this.config.hostname + article.permalink);
            link = string.replaceAll(link, '(((title)))', article.title);
            link = string.replaceAll(link, '(((wstitle)))', this.config.site.title);
            link = string.replaceAll(link, '(((wsurl)))', this.config.hostname);

            ret += `<span class="socialshare socialshare-${string.slugify(item.name)}">`;

            if (item.icon) {
                ret += `<a href="${link}" title="Share via ${item.name}.">`;
                ret += `<img src="${item.icon}" alt="Icon for ${item.name}" />`;
                ret += `</a>`;
            } else {
                ret += `<a href="${link}" title="Share via ${item.name}.">${item.name}</a>`;
            }

            ret += '</span>';

        }

        return ret;

    }

}

module.exports = SocialSharesShortcode;
  