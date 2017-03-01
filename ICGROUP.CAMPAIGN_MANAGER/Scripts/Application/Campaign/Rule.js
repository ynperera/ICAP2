var Rule = (function () {

    var index = 0;
    var commentIndex = 0;

    // Control Prefix
    var PFX_RULE_CONTAINER = 'ruleContainer';
    var PFX_RULE_DATA_DIV = 'ruleDataDiv';
    var PFX_RULE_TEXT_AREA = 'ruleTextArea';
    var PFX_BTN_NEW_RULE = 'btnNewRule';
    var PFX_BTN_SAVE_RULE = 'btnSaveRule';
    var PFX_BTN_EDIT_RULE = 'btnEditRule';
    var PFX_BTN_REMOVE_RULE = 'btnRemoveRule';
    var PFX_MAIN_COMMENT_CONTAINER = 'mainCommentContainer';
    var PFX_BTN_ADD_COMMENT = 'btnAddComment';
    var PFX_BTN_APPROVE_RULE = 'btnApproveRule';
    var PFX_COMMENT_CONTAINER = 'commentContainer';
    var PFX_COMMENT_TEXT_AREA = 'commentTextArea';
    var PFX_BTN_SAVE_COMMENT = 'btnSaveComment';
    var PFX_BTN_REMOVE_COMMENT = 'btnRemoveComment';
    var PFX_COMMENT_DATA_DIV = 'CommentDataDiv';

    var _createRuleSection = function () {

        var currentIndex = index + 1;

        var ruleSectionId = PFX_RULE_CONTAINER + (currentIndex);
        var dataDivId = PFX_RULE_DATA_DIV + (currentIndex);
        var textAreaId = PFX_RULE_TEXT_AREA + (currentIndex);

        var buttonEditor = PFX_BTN_NEW_RULE + (currentIndex);
        var buttonSave = PFX_BTN_SAVE_RULE + (currentIndex);
        var buttonEdit = PFX_BTN_EDIT_RULE + (currentIndex);
        var buttonRemove = PFX_BTN_REMOVE_RULE + (currentIndex);
        var commentDivId = PFX_MAIN_COMMENT_CONTAINER + (currentIndex);
        var btnCommentId = PFX_BTN_ADD_COMMENT + (currentIndex);
        var btnApproveId = PFX_BTN_APPROVE_RULE + (currentIndex);

        //TODO:Get Permission Data and Load Buttons Accordingly

        var element =
            '<div id="' + ruleSectionId + '"   style="border:1px solid black" > ' +
            '<button type="button" id="' + buttonSave + '" onclick="Rule.saveRuleSection(' + currentIndex + ')">Save</button>' +
            '<button type="button" id="' + buttonEdit + '" onclick="Rule.editRuleSection(' + currentIndex + ')">Edit</button> ' +
            '<button type="button" id="' + btnCommentId + '" onclick="Rule.createCommentSection(' + currentIndex + ')">Comment</button>' +
            '<button type="button" id="' + btnApproveId + '" onclick="Rule.approveRuleSection(' + currentIndex + ')">Approve</button>' +
            '<button type="button" id="' + buttonEditor + '" onclick="Rule.createRuleSection()">Create new editor</button>' +
            '<button type="button" id="' + buttonRemove + '" onclick="Rule.removeRuleSection(' + currentIndex + ')">Delete</button> ' +
            '<textarea cols="80" id="' + textAreaId + '">	</textarea> <div id="' + dataDivId + '"></div>' +
            '<input type="hidden" name="sectionId">' +
            '<div id="' + commentDivId + '"></div id=""></div>';

        $('#rule_container').append(element);

        CKEDITOR.replace(textAreaId, {});

        index++;
    };

    var _saveRuleSection = function (index) {
        var textElementId = PFX_RULE_TEXT_AREA + index;
        var dataElementId = PFX_RULE_DATA_DIV + index;

        var data = CKEDITOR.instances[textElementId].getData();
        //Todo:Add/Edit based on section ID
        Util.View.showLoader('<span class="cont_loader"></span>', {disableOk: true});
        var sectionObj = {
            sectionId: undefined,
            campaignId: Util.Url.getUrlParamsByUrl(document.URL, CAMPAIGN_MANAGER.WEB.META.URLParams.Id),
            content: data
        };
        ServiceHandler.addSection(sectionObj,
            function (data) {
                _showSuccessMsg('Successfully Updated', CAMPAIGN_MANAGER.WEB.META.MessageType.Info)
            }
        )

        CKEDITOR.instances[textElementId].destroy();
        $('#' + textElementId).hide();
        $('#' + dataElementId).show();
        $('#' + dataElementId).html(data);

    };

    var _editRuleSection = function (index) {

        var textElementId = PFX_RULE_TEXT_AREA + index;
        var dataElementId = PFX_RULE_DATA_DIV + index;
        var data = $('#' + dataElementId).html();

        $('#' + textElementId).show();
        $('#' + textElementId).html(data);
        $('#' + dataElementId).hide();

        CKEDITOR.replace(textElementId, {});
    };

    var _removeRuleSection = function (index) {
        var sourceElementId;

        Util.View.showLoader('<span class="cont_loader"></span>', {disableOk: true});
        var sectionObj = {
            sectionId: undefined
        };
        ServiceHandler.addSection(sectionObj,
            function (data) {
                _showSuccessMsg('Successfully Updated', CAMPAIGN_MANAGER.WEB.META.MessageType.Info)
            }
        )
        $('#' + PFX_RULE_CONTAINER + index).remove();

    };

    var _approveRuleSection = function (index) {

        Util.View.showLoader('<span class="cont_loader"></span>', {disableOk: true});
        var sectionObj = {
            sectionId: undefined  //Todo:Get Section ID
        };
        ServiceHandler.addSection(sectionObj,
            function (data) {
                _showSuccessMsg('Successfully Updated', CAMPAIGN_MANAGER.WEB.META.MessageType.Info)
            }
        )
    };

    var _showSuccessMsg = function (message, messageType) {
        if (messageType !== CAMPAIGN_MANAGER.WEB.META.MessageType.Error) {
            Util.View.showMessage('Info', message, messageType);
        } else {
            Util.View.showMessage('Error', message, messageType);
        }
    };

    var _createCommentSection = function (index) {

        var currentCommentIndex = commentIndex + 1;
        var commentContainerId = PFX_COMMENT_CONTAINER + (currentCommentIndex);
        var commentTextBoxId = PFX_COMMENT_TEXT_AREA + (currentCommentIndex);
        var commentSubmitId = PFX_BTN_SAVE_COMMENT + (currentCommentIndex);
        var commentRemoveId = PFX_BTN_REMOVE_COMMENT + (currentCommentIndex);
        var commentDataDivId = PFX_COMMENT_DATA_DIV + (currentCommentIndex);
        commentIndex++;

        var element = '<div id="' + commentContainerId + '"   style="border:1px solid black" > ' +
            ' <textarea cols="80" id="' + commentTextBoxId + '"></textarea>' + '<div id="' + commentDataDivId + '"> </div>' +
            '<button type="button" id="' + commentSubmitId + '  "onclick="Rule.saveComment(' + currentCommentIndex + ')">Save Comment</button>'
            + '<button type="button" id="' + commentRemoveId + '  "onclick="Rule.removeComment(' + currentCommentIndex + ')">Delete Comment</button>'
            + '<input type="hidden" name="commentId">'
            + '</div>';

        $('#' + PFX_MAIN_COMMENT_CONTAINER + index).append(element);

    };


    var _saveComment = function (index) {

        var textElementId = PFX_COMMENT_TEXT_AREA + index;
        var dataElementId = PFX_COMMENT_DATA_DIV + index;

        var comment = $("#" + textElementId).val();

        Util.View.showLoader('<span class="cont_loader"></span>', {disableOk: true});
        var commentObj = {
            commentId: undefined, //Todo:Get Section ID
            sectionId: undefined,
            contents: comment
        };
        ServiceHandler.addComment(commentObj,
            function (data) {
                _showSuccessMsg('Successfully Updated', CAMPAIGN_MANAGER.WEB.META.MessageType.Info)
            }
        )

        $("#" + textElementId).hide();
        $("#" + dataElementId).show();
        $("#" + dataElementId).html(comment);
    }


    var _removeComment = function (index) {
        Util.View.showLoader('<span class="cont_loader"></span>', {disableOk: true});
        var commentObj = {
            commentId: undefined //Todo:Get Section ID
        };
        ServiceHandler.deleteComment(commentObj,
            function (data) {
                _showSuccessMsg('Successfully Updated', CAMPAIGN_MANAGER.WEB.META.MessageType.Info)
            }
        )
        $('#' + PFX_COMMENT_CONTAINER + index).remove();
    }
    
    return {
        createRuleSection: _createRuleSection,
        saveRuleSection: _saveRuleSection,
        editRuleSection: _editRuleSection,
        removeRuleSection: _removeRuleSection,
        approveRuleSection: _approveRuleSection,
        createCommentSection: _createCommentSection,
        saveComment: _saveComment,
        removeComment: _removeComment
    }
})();
