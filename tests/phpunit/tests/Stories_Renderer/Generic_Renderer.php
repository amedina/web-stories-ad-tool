<?php
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace Google\Web_Stories\Tests\Stories_Renderer;

use Google\Web_Stories\Model\Story;
use Google\Web_Stories\Story_Query as Stories;

/**
 * @coversDefaultClass \Google\Web_Stories\Stories_Renderer\Generic_Renderer
 */
class Generic_Renderer extends \WP_UnitTestCase_Base {

	/**
	 * Stories mock object.
	 *
	 * @var Stories
	 */
	private $stories;

	/**
	 * Story post ID.
	 *
	 * @var int
	 */
	private static $story_id;

	/**
	 * Story model.
	 *
	 * @var Story
	 */
	private $story_model;

	/**
	 * Runs once before any test in the class run.
	 *
	 * @param \WP_UnitTest_Factory $factory Factory class object.
	 */
	public static function wpSetUpBeforeClass( $factory ) {

		self::$story_id = $factory->post->create(
			[
				'post_type'    => \Google\Web_Stories\Story_Post_Type::POST_TYPE_SLUG,
				'post_title'   => 'Example title',
				'post_status'  => 'publish',
				'post_content' => 'Example content',
			]
		);

	}

	/**
	 * Runs once before any test in the class run.
	 */
	public function setUp() {
		$this->story_model = $this->createMock( Story::class );
		$this->stories     = $this->createMock( Stories::class );
		$this->stories->method( 'get_stories' )->willReturn( [ $this->story_model ] );
	}

	/**
	 * @covers ::assets
	 */
	public function test_assets() {

		$this->stories->method( 'get_story_attributes' )->willReturn(
			[
				'class'      => '',
				'view_type'  => 'grid',
				'show_title' => true,
			]
		);

		$renderer = new \Google\Web_Stories\Stories_Renderer\Generic_Renderer( $this->stories );
		$renderer->init();

		$this->assertTrue( wp_style_is( \Google\Web_Stories\Embed_Base::STORY_PLAYER_HANDLE ) );
	}

	/**
	 * @covers ::render
	 */
	public function test_render() {

		$this->stories->method( 'get_story_attributes' )->willReturn(
			[
				'view_type'                 => 'grid',
				'number_of_columns'         => 2,
				'list_view_image_alignment' => 'left',
				'class'                     => '',
				'show_title'                => false,
				'show_author'               => false,
				'show_date'                 => false,
				'show_excerpt'              => false,
				'show_stories_archive_link' => false,
				'has_square_corners'        => false,
				'stories_archive_label'     => __( 'View all stories', 'web-stories' ),
				'class'                     => '',
				'circle_size'               => 150,
			]
		);

		$renderer = new \Google\Web_Stories\Stories_Renderer\Generic_Renderer( $this->stories );
		$renderer->init();

		$output = $renderer->render();

		$this->assertContains( 'web-stories-list alignnone is-view-type-grid', $output );
		$this->assertContains( 'web-stories-list__story', $output );
		$this->assertContains( 'web-stories-list__story-poster', $output );

	}

}
