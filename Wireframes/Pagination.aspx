<%@ Page Title="" Language="C#" MasterPageFile="~/Source/Master Pages/MainMasterFixed.master" AutoEventWireup="true" CodeFile="Pagination.aspx.cs" Inherits="Source_Wireframes_Pagination" %>

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
                   <h1>Holiday Idea Request</h1>
                    Need inspiration or ideas for your holiday? Fill in our form below and one of our agents will contact you to discuss ideas.<br />
                    <div id="contact-form" class="contactFormPagination">
                        <fieldset>
                            <asp:Wizard ID="WizPagination" CssClass="paginatedWizard" DisplaySideBar="false" runat="server">
                                <WizardSteps>
                                    <asp:WizardStep ID="WizPaginationPersonal" runat="server" StepType="Start" Title="Step 1">
                                        <h3>Your Contact Details</h3>
                                        <asp:Label ID="lblFirstName" runat="server"><%=Resources.Text.RegisterFirstNameLbl %></asp:Label><br />
                                        <asp:TextBox ID="txtFirstName" class="validation" runat="server"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="rqfieldFirstName" ForeColor="Red" ControlToValidate="txtFirstName" runat="server" ErrorMessage="Oops, Your First Name Is Required"></asp:RequiredFieldValidator><br />
                                        <asp:Label ID="lblLastName" runat="server"><%=Resources.Text.RegisterLastNameLbl %></asp:Label><br />
                                        <asp:TextBox ID="txtLastName" class="validation" runat="server"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="rqfieldLastName" ForeColor="Red" ControlToValidate="txtLastName" runat="server" ErrorMessage="Oops, you forgot your Last Name"></asp:RequiredFieldValidator><br />
                                        <asp:Label ID="lblEmail" runat="server"><%=Resources.Text.RegisterEmailLbl %></asp:Label><br />
                                        <asp:TextBox ID="txtEmail" class="validation" runat="server"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="rqfieldEmail" ForeColor="Red" ControlToValidate="txtEmail" runat="server" ErrorMessage="Oops, you forgot your Email Address"></asp:RequiredFieldValidator><br />
                                        <asp:Label ID="lblPhone" runat="server"><%=Resources.Text.RegisterPhoneLbl %></asp:Label><br />
                                        <asp:TextBox ID="txtPhone" class="validation" runat="server"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="rqfieldPhone" ForeColor="Red" ControlToValidate="txtPhone" runat="server" ErrorMessage="Your Phone Number is Required"></asp:RequiredFieldValidator><br />
                                    </asp:WizardStep>
                                    <asp:WizardStep ID="WizPaginationHoliday" runat="server" StepType="Complete" Title="Step 2">
                                        <h3>Holiday Details</h3>
                                        <asp:Label ID="lblHolidayType" runat="server" Text="What Holiday Type Are You Interested In"></asp:Label>
                                        <asp:RadioButtonList ID="RadioHolidayType" runat="server">
                                            <asp:ListItem Enabled="true" Text="Beach"></asp:ListItem>
                                            <asp:ListItem Enabled="true" Text="Skiing"></asp:ListItem>
                                            <asp:ListItem Enabled="true" Text="Hiking"></asp:ListItem>
                                            <asp:ListItem Enabled="true" Text="City Break"></asp:ListItem>
                                        </asp:RadioButtonList><br />
                                        <asp:Label ID="lblHolidayCountry" runat="server" Text="Which Holiday Destination Would You Like To Travel To?"></asp:Label>
                                        <asp:DropDownList ID="ddlCountries" runat="server"></asp:DropDownList>
                                        <asp:Label ID="lblHolidayDate" runat="server" Text="When does your Holiday start?"></asp:Label>
                                        <asp:Calendar ID="clndrHolidayDate" runat="server"></asp:Calendar><br />
                                        <asp:Label ID="lblComments" runat="server" Text="Comments"></asp:Label>
                                        <asp:TextBox ID="tbComments" runat="server" TextMode="MultiLine"></asp:TextBox><br /><br /><br />
                                        <asp:Button ID="btnBookHoliday" runat="server" Text="Submit Holiday Idea Request" OnClick="btnBookHoliday_Click" />
                                    </asp:WizardStep>
                                </WizardSteps>
                            </asp:Wizard>
                        </fieldset>

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

