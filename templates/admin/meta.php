<?php
/**
 *
 */
?>

<script type="text/x-handlebars-template" id="fz-resume-template-meta-box">
	<div id="fz-resume-meta-box" class="postbox ">
		<button type="button" class="handlediv button-link" aria-expanded="true">
			<span class="screen-reader-text">Toggle panel: Resume Sections</span>
			<span class="toggle-indicator" aria-hidden="true"></span>
		</button>
		<h2 class="hndle ui-sortable-handle"><span>Resume Sections</span></h2>
		<div class="inside">
			<div class="meta-fields">

			</div>
			<button>Add a List</button>
		</div>
	</div>
</script>

<script type="text/x-handlebars-template" id="fz-resume-template-meta-box-inside">
	<ul>

	</ul>
</script>

<script type="text/x-handlebars-template" id="fz-resume-template-list">
	<ul>
		{{#each items}}
			<li>{{ this }}</li>
		{{/each}}
	</ul>
</script>
