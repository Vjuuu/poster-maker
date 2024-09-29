$(document).ready(function()
{
   const base_url = 'file:///C:/local-project/poster-maker/mobile-layout';

    $('.btn-poster').on('click',function()
    {
        const imgSrc = $(this).attr('src');
        // Show the modal
        $('#loadPoster').modal('show');
        
        // Set the image source in the modal preview
        $('#posterPreview').attr('src', imgSrc);
        
        // Set the download link and file name
        const base_url = 'https://yourdomain.com/'; // Change this to your base URL
        $('#btnPosterDownload').attr('download', imgSrc.split('/').pop());
        $('#btnPosterDownload').attr('href', base_url + imgSrc);

        
    })
})