<?php
/**
 *
 */
?>

<script type="text/x-handlebars-template" id="fz-resume-template-meta-box">
	<div>
		<div class="meta-fields-test"></div>
		<ul class="meta-fields"></ul>
		Add: <span class="add-button-wrap"></span>
	</div>
</script>

<script type="text/x-handlebars-template" id="fz-resume-template-field-button">
	<button type="button" class="add-button" data-field-type="{{ field_type }}">{{ field_label }}</button>
</script>

<script type="text/x-handlebars-template" id="fz-resume-template-meta-field-wrap">
	<input type="hidden" name="fz_resume[{{ field_number }}][field]" value="{{ field_type }}" />
	<span class="fz-resume-handle dashicons dashicons-sort"></span>
	<div class="meta-field-inside"></div>
	<span class="fz-resume-remove dashicons dashicons-dismiss"></span>
</script>

<script type="text/x-handlebars-template" id="fz-resume-template-meta-field-section-title">
	<label>Section Title: <input type="text" class="regular-text" name="fz_resume[{{ field_number }}][value]" value="{{ value }}" /></label>
</script>

<script type="text/x-handlebars-template" id="fz-resume-template-meta-field-subsection-title">
	<label>Subsection Title: <input type="text" class="regular-text" name="fz_resume[{{ field_number }}][value]" value="{{ value }}" /></label>
</script>

<script type="text/x-handlebars-template" id="fz-resume-template-meta-field-experience">
	<label>Name: <input type="text" class="regular-text" name="fz_resume[{{ field_number }}][value][name]" value="{{ value.name }}" /></label><br />
	<label>Title: <input type="text" class="regular-text" name="fz_resume[{{ field_number }}][value][title]" value="{{ value.title }}" /></label><br />
	<input type="text" class="fz-resume-date" name="fz_resume[{{ field_number }}][value][start]" value="{{ value.start }}" /> &mdash; <input type="text" class="fz-resume-date" name="fz_resume[{{ field_number }}][value][end]" value="{{ value.end }}" />
</script>

<script type="text/x-handlebars-template" id="fz-resume-template-meta-repeater">
	<div>
		<ul class="list-items">
		</ul>
		<button type="button" class="add-list-item-button">Add Item</button>
	</div>
</script>

<script type="text/x-handlebars-template" id="fz-resume-template-meta-repeater-item-wrap">
	<li>
		<span class="fz-resume-list-handle dashicons dashicons-sort"></span>
		<div class="list-item-inside"></div>
		<span class="fz-resume-list-remove dashicons dashicons-dismiss"></span>
	</li>
</script>

<script type="text/x-handlebars-template" id="fz-resume-template-meta-field-list-item">
	<input type="text" class="large-text" name="fz_resume[{{ field_number }}][value][{{ item_number }}]" value="{{ value }}" />
</script>
