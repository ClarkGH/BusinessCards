var apiResult = JSON.parse(the_result_of_api_call);
var template = '<strong id="city"><%= list[0].name %></strong>';
var output = _.template(template)(apiResult);