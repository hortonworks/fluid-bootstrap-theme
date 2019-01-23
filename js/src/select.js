/**
 * Copyright (c) 2011-2018, Hortonworks Inc.  All rights reserved.
 * Except as expressly permitted in a written agreement between you
 * or your company and Hortonworks, Inc, any use, reproduction,
 * modification, redistribution, sharing, lending or other exploitation
 * of all or any part of the contents of this file is strictly prohibited.
 */

if ($.fn.selectpicker) {
  $.fn.selectpicker.Constructor.DEFAULTS.style = ''; // remove .btn-light from default bootstrap-select styling
}
