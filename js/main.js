// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function(){
  
// Create a function called `searchImages()`. This function will handle the
// process of taking a user's search terms and sending them to Flickr for a
// response.

// Accept a string value called `tags` as an argument. Example:
// `var searchPhotos = function
var searchImages = function(tags) {
  
  // Define the location of the Flickr API
  var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  console.log(tags);
  $('#images').innerHTML = '<li class="flickr-search">Searching... </li>';
  //Construct a `$.getJSON()` call where you send a request object including the tags the user submitted,
  $.getJSON( flickrAPI, {
    tags: tags,
    tagmode: "any",
    format: "json"
  }).done( function ( data ) {   //.done()` handler that displays and refreshes the content appropriately.
      $('#images').empty();
      $('h1.search-title').first()[0].innerHTML = "Searched for: " + tags;
      $.each( data.items, function( i, item ) {
        // displayed information of photo shown
        var newList = $('<li  class ="col-sm- 6 col-md-4" id="image-list">'); // col class created for better layout
        
        var newTitle = $('<p class= "image-title">').html(item.title).appendTo(newList);
        var newDate = $('<p class = "image-date">').text(item.date_taken).appendTo(newList);
        var newDescription = $('<p class="image-description">').html(item.description).appendTo(newList);
        // link refrencing where to view photo on flickr
        var newLink = $('<a>').attr('href', item.link).text('View on Flickr!').appendTo(newList);
        
        var newButton = $('<button class="btn btn-small btn-primary" id="modalButton">Enlarge</button>').attr({
          'data-title': item.title,
          'data-toggle': "modal",
          'data-target': "#infoModal",
          'data-imgsrc' : item.media.m,
          'data-description' : item.description,
          'type': "button"
        }).appendTo(newList);
        
  // Update the display to add the images to the list with the id `#images`.
  newList.appendTo("#images");
  // limit images displayed to 15
  if (i === 14){
    return false;
      }
    });
  });
};
    // Attach an event to the search button (`button.search`) to execute the search when clicked.
 $('button.search').on('click', function(event){
    //Prevent the default event execution so the browser doesn't Example: `event.preventDefault();`
    event.preventDefault();
    //Get the value of the 'input[name="searchText"]' and use that as the `tags` value you send to `searchImages()`.
    var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
    console.log(searchTextInput.value);
    //  Execute the `searchImages()` function to fetch images for the user.
    searchImages(searchTextInput.value);
 });
 
    $('#infoModal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget); // Button that triggered the modal
      var title = button.data('title');// Extract info from data-* attributes
      var imgSrc = button.data('imgsrc');
      var imgDescription = button.data('description');
      
      var modal = $(this);
      modal.find('.modal-title').html(title);
      var modalBody = modal.find('.modal-body');
      modalBody.empty();
      var modalDescription = $('<p class= "image-description">').html(imgDescription).appendTo(modalBody);
    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target
});


});
