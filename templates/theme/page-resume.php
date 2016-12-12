<?php
/**
 * Template Name: Page - Resume
 * Description: Resume Page.
 *
 * @package WordPress
 * @subpackage BootstrapWP
 */
get_header(); ?>
<?php while (have_posts()) : the_post();
	$resume_meta = get_post_meta( get_the_ID(), 'fz_resume_meta', true ); ?>

	<div class="container">
	<header class="page-title">
		<h2><?php the_title();?></h2>
	</header>

	<div>
	<?php the_content(); ?>

	<?php foreach ( $resume_meta as $field_data ) :
		$field_type = $field_data['field'];
		$value      = $field_data['value']; ?>

		<?php if ( 'section-title' === $field_type ) : ?>
		<h3><?php echo esc_html( $value ); ?></h3>
	<?php elseif ( 'subsection-title' === $field_type ) : ?>
		<h4><?php echo esc_html( $value ); ?></h4>
	<?php elseif ( 'experience' === $field_type ) : ?>

		<h4><?php echo esc_html( $value['name'] ); ?></h4>
		<p>
			<strong><?php echo esc_html( $value['title'] ); ?></strong><br />
			<?php
			$start = date_create_from_format( 'm-d-Y', $value['start'] );
			$end   = date_create_from_format( 'm-d-Y', $value['end'] );

			if ( ! empty( $start ) ) {
				echo esc_html( $start->format( 'F Y' ) );

				if ( ! empty( $end ) ) {
					echo ' &ndash; ' . esc_html( $end->format( 'F Y' ) );
				}
			}

			?>
		</p>
	<?php elseif ( 'list' === $field_type ) : ?>
		<ul>
			<?php foreach ( $value['items'] as $item ) : ?>
				<li><?php echo esc_html( $item ); ?></li>
			<?php endforeach; ?>
		</ul>
	<?php endif; ?>
	<?php endforeach; ?>
<?php endwhile; // end of the loop. ?>

	</div><!--/.row content -->
	</div><!--/.container -->

<?php get_footer(); ?>

<?php
