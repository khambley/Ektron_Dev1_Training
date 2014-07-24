<%@ Page Title="" Language="C#" MasterPageFile="~/Source/Master Pages/MainMasterFixed.master" AutoEventWireup="true" CodeFile="XMLImporter.aspx.cs" Inherits="Source_Wireframes_XMLImporter" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphPageHost" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">
<div class="container">
            <div class="row ektron-large-vertical-padding ektron-mega-top-padding">
                <div class="span3 hidden-phone">
                    <!-- Left Navigation Area -->
 
                    <!-- End of Left Navigation Area -->
                </div>
                <div class="span7 ektron-content">
                    <!-- Start of Content Section -->
                    <div class="ektron-large-bottom-margin">
                   <!-- Dropzone Section -->
                    <h1>Structured XML File Import</h1><br />
                    <div id="contact-form">
                        <fieldset>
                            <asp:Label ID="lblAttachment" runat="server" Text="XML File To Upload"></asp:Label><br />
                            <asp:FileUpload ID="uploadAttachment" runat="server" /><br />
                            <asp:Button ID="btnUploadFile" runat="server" Text="Upload" OnClick="btnUploadFile_Click" />
                        </fieldset><br />
                        <asp:Literal ID="litMessage" runat="server"></asp:Literal>
                    </div>
                   <!-- End Dropzone Section -->
                    </div>
                </div>
                <div class="span2">
                   <!-- Right Hand Column Section -->

                   <!-- End Right Hand Column Section -->
                </div>
            </div>
        </div>
     <!-- Grey Footer Section -->
    <div class="ektron-black-texture ektron-mega-top-padding ektron-huge-bottom-padding">
        <div class="container">
            <div class="row">
                <div>
                    <div class="ektron-940-huge-horizontal-margin ektron-724-float-widgets-50">
                   <!-- Footer Section -->
 
                   <!-- End Footer Section -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End of Grey Footer Section -->
</asp:Content>

