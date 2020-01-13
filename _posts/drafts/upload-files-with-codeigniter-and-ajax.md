# Uploading Files with CodeIgniter and AJAX Tutorial and Example

Uploading files asynchronously with CodeIgniter can be a confusing and frustrating experience. In this series, I will show you the steps of how I successfully implemented a file upload with CodeIgniter and ajax.

You need CodeIgniter, jQuery, and the script Ajax File Upload.

I am assuming that you have a working knowledge of CodeIgniter and jQuery. But no prior knowledge of AjaxFileUpload is necessary. It is also assumed that you already have successfully set up CodeIgniter. For the sake of brevity and clarity, we are not going to use the database to save file information

**Step 1. Creating a form**
  
Create your view and name it upload.php. This view will contain our upload form.

<!doctype html>  
<html>  
<head>  
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>  
<script src="<?php echo base_url()?>js/custom.js"></script>  
<script src="<?php echo base_url()?>js/ajaxfileupload.js"></script>  
</head>  
<body>  
<h1>Upload File</h1>  
<form method="post" action="" id="upload_file">  
<label for="userfile">File</label>  
  
<input type="file" name="userfile" id="userfile" size="20" />  
<input type="submit" name="submit" id="submit" />  
</form>  
<h2>Files</h2>  
<div id="files"></div>  
</body>  
</html>

Then, we created a standard HTML form. The empty #files div is where the confirmation/failure message will be displayed.  
Step 2. Custom Javascript  
Create custom.js inside the ‘js’ folder and Place the following code:

$(function() {  
$('#upload_file').submit(function(e) {  
e.preventDefault();  
$.ajaxFileUpload({  
url :base_url + './upload/upload_file/',  
secureuri :false,  
fileElementId :'userfile',  
dataType: 'JSON',  
success : function (data)  
{  
var obj = jQuery.parseJSON(data);  
if(obj['status'] == 'success')  
{  
$('#files').html(obj['msg']);  
}  
else  
{  
$('#files').html('Some failure message');  
}  
}  
});  
return false;  
});  
});

The JavaScript hijacks the form submit and AjaxFileUpload takes over. In the background, it creates an iframe and submits the data via that.  
We then check our return (which will be in JSON). Depending on the status(success/error), we display the message.  
Step 3. Uploading a File  
The Controller  
The URL we are uploading to is /upload/upload_file/, so create a new method in the upload controller, and place the following code in it.

public function upload_file()  
{  
$status = "";  
$msg = "";  
$file_element_name = 'userfile';  
  
if ($status != "error")  
{  
$config['upload_path'] = './uploads/';  
$config['allowed_types'] = 'gif|jpg|png|doc|txt';  
$config['max_size'] = 1024 * 8;  
$config['encrypt_name'] = FALSE;  
  
$this->load->library('upload', $config);  
if (!$this->upload->do_upload($file_element_name))  
{  
$status = 'error';  
$msg = $this->upload->display_errors('', '');  
}  
else  
{  
$data = $this->upload->data();  
$image_path = $data['full_path'];  
if(file_exists($image_path))  
{  
$status = "success";  
$msg = "File successfully uploaded";  
}  
else  
{  
$status = "error";  
$msg = "Something went wrong when saving the file, please try again.";  
}  
}  
@unlink($_FILES[$file_element_name]);  
}  
echo json_encode(array('status' => $status, 'msg' => $msg));  
}  

This code loads in the CodeIgniter upload library with a custom config. Remember to delete the temp file of the server, and echo out the JSON so we know what happened.

**Files Folder**  
We should also create the folder our files will be uploaded to. Create a new file in your webroot called ‘uploads’, making sure it is writable by the server.

That’s it, tutorial complete! If you run it, you should be able to upload a file, see it appear, all without leaving the page.

Note: I haven’t added displaying, editing and deleting files.

Goodies:  
Copy and paste the following javascript code and save as  **ajaxfileupload.js**.

jQuery.extend({	

  createUploadIframe: function(id, uri)
	{
			//create frame
      var frameId = 'jUploadFrame' + id;
      var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
			if(window.ActiveXObject)
			{
        if(typeof uri== 'boolean'){
iframeHtml += ' src="' + 'javascript:false' + '"';

        }
        else if(typeof uri== 'string'){
iframeHtml += ' src="' + uri + '"';

        }	
			}
			iframeHtml += ' />';
			jQuery(iframeHtml).appendTo(document.body);

      return jQuery('#' + frameId).get(0);			
  },
  createUploadForm: function(id, fileElementId, data)
	{
		//create form	
		var formId = 'jUploadForm' + id;
		var fileId = 'jUploadFile' + id;
		var form = jQuery('<form action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');	
		if(data)
		{
			for(var i in data)
			{
				jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
			}			
		}		
		var oldElement = jQuery('#' + fileElementId);
		var newElement = jQuery(oldElement).clone();
		jQuery(oldElement).attr('id', fileId);
		jQuery(oldElement).before(newElement);
		jQuery(oldElement).appendTo(form);
		
		//set attributes
		jQuery(form).css('position', 'absolute');
		jQuery(form).css('top', '-1200px');
		jQuery(form).css('left', '-1200px');
		jQuery(form).appendTo('body');		
		return form;
  },

  ajaxFileUpload: function(s) {
    // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout		
    s = jQuery.extend({}, jQuery.ajaxSettings, s);
    var id = new Date().getTime()    
		var form = jQuery.createUploadForm(id, s.fileElementId, (typeof(s.data)=='undefined'?false:s.data));
		var io = jQuery.createUploadIframe(id, s.secureuri);
		var frameId = 'jUploadFrame' + id;
		var formId = 'jUploadForm' + id;		
    // Watch for a new set of requests
    if ( s.global && ! jQuery.active++ )
		{
			jQuery.event.trigger( "ajaxStart" );
		}      
    var requestDone = false;
    // Create the request object
    var xml = {} 
    if ( s.global )
      jQuery.event.trigger("ajaxSend", [xml, s]);
    // Wait for a response to come back
    var uploadCallback = function(isTimeout)
		{			
			var io = document.getElementById(frameId);
      try
			{				
				if(io.contentWindow)
				{
 xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;
        	 xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;

				}else if(io.contentDocument)
				{
 xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;
        	xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;
				}	
      }catch(e)
			{
				jQuery.handleError(s, xml, null, e);
			}
      if ( xml || isTimeout == "timeout")
			{				
        requestDone = true;
        var status;
        try {
          status = isTimeout != "timeout" ? "success" : "error";
          // Make sure that the request was successful or notmodified
          if ( status != "error" )
{
            // process the data (runs the xml through httpData regardless of callback)
            var data = jQuery.uploadHttpData( xml, s.dataType );  
            // If a local callback was specified, fire it and pass it the data
            if ( s.success )
              s.success( data, status );
 
            // Fire the global callback
            if( s.global )
              jQuery.event.trigger( "ajaxSuccess", [xml, s] );
          } else
            jQuery.handleError(s, xml, status);
        } catch(e)
				{
          status = "error";
          jQuery.handleError(s, xml, status, e);
        }

        // The request was completed
        if( s.global )
          jQuery.event.trigger( "ajaxComplete", [xml, s] );

        // Handle the global AJAX counter
        if ( s.global && ! --jQuery.active )
          jQuery.event.trigger( "ajaxStop" );

        // Process result
        if ( s.complete )
          s.complete(xml, status);

        jQuery(io).unbind()

        setTimeout(function()
				{	try
					{
						jQuery(io).remove();
						jQuery(form).remove();	
						
					} catch(e)
					{
						jQuery.handleError(s, xml, null, e);
					}				

				}, 100)

        xml = null

      }
    }
    // Timeout checker
    if ( s.timeout > 0 )
		{
      setTimeout(function(){
        // Check to see if the request is still happening
        if( !requestDone ) uploadCallback( "timeout" );
      }, s.timeout);
    }
    try
		{

			var form = jQuery('#' + formId);
			jQuery(form).attr('action', s.url);
			jQuery(form).attr('method', 'POST');
			jQuery(form).attr('target', frameId);
      if(form.encoding)
			{
				jQuery(form).attr('encoding', 'multipart/form-data');   			
      }
      else
			{	
				jQuery(form).attr('enctype', 'multipart/form-data');			
      }			
      jQuery(form).submit();

    } catch(e)
		{			
      jQuery.handleError(s, xml, null, e);
    }
		
		jQuery('#' + frameId).load(uploadCallback	);
    return {abort: function () {}};	

  },

  uploadHttpData: function( r, type ) {
    var data = !type;
    data = type == "xml" || data ? r.responseXML : r.responseText;
    // If the type is "script", eval it in global context
    if ( type == "script" )
      jQuery.globalEval( data );
    // Get the JavaScript object, if JSON is used.
    if ( type == "json" )
      eval( "data = " + data );
    // evaluate scripts within html
    if ( type == "html" )
      jQuery("<div>").html(data).evalScripts();

    return data;
  }
})