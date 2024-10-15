// $(document).ready(function () {
//     // Show loader when the page starts loading
//     $('#loader-wrapper').show();
//     // Hide loader and show content when page is fully loaded
//     $(window).on('load', function () {
//         $('#loader-wrapper').fadeOut('slow', function () {
//             $('#content').fadeIn('slow');
//         });
//     });
// });

$(document).ready(function () {
    const base_url = 'file:///C:/local-project/poster-maker/mobile-layout';

    $('.btn-poster').on('click', function () {
        const imgSrc = $(this).attr('src');
        // Show the modal
        $('#loadPoster').modal('show');

        // Set the image source in the modal preview
        $('#posterPreview').attr('src', imgSrc);

        // Set the download link and file name
        const base_url = 'https://status247.netlify.app/mobile-layout/'; // Change this to your base URL
        $('#btnPosterDownload').attr('download', imgSrc.split('/').pop());
        $('#btnPosterDownload').attr('href', base_url + imgSrc);


    })
})

