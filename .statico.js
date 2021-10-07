/**
 * Please refer to the following files in the root directory:
 * 
 * README.md        For information about the package.
 * LICENSE          For license details, copyrights and restrictions.
 */
'use strict';

const { syslog } = require('gajn-framework');
const SocialSharesShortcode = require('./src/shortcodes/socialsharesShortcode');

module.exports = function(config, options = {}) {

    config.addNunjucksShortcode('socialshares', SocialSharesShortcode);
    syslog.debug(`Added shortcode to Nunjucks: socialshares`);

}
 